import re,json,gzip,os
aff=open('/usr/share/hunspell/en_US.aff',encoding='utf-8').read().splitlines()
rules={}
i=0
while i<len(aff):
    t=aff[i].split()
    if len(t)==4 and t[0] in('PFX','SFX') and t[2] in('Y','N'):
        kind,flag,cross,n=t[0],t[1],t[2]=='Y',int(t[3]);lst=[]
        for j in range(n):
            u=aff[i+1+j].split()
            strip='' if u[2]=='0' else u[2];add='' if u[3]=='0' else u[3].split('/')[0];cond=u[4] if len(u)>4 else '.'
            rx=re.compile((cond+'$') if kind=='SFX' else ('^'+cond))
            lst.append((strip,add,rx))
        rules[flag]=(kind,cross,lst);i+=n+1
    else:i+=1
def apply(w,flag):
    kind,cross,lst=rules[flag];out=[]
    for strip,add,rx in lst:
        if not rx.search(w):continue
        if kind=='SFX':
            if strip and not w.endswith(strip):continue
            out.append(w[:len(w)-len(strip)]+add)
        else:
            if strip and not w.startswith(strip):continue
            out.append(add+w[len(strip):])
    return out
words=set()
for line in open('/usr/share/hunspell/en_US.dic',encoding='utf-8').read().splitlines()[1:]:
    if '/' in line:w,fl=line.split('/',1)
    else:w,fl=line,''
    fl=[f for f in fl if f in rules]
    forms={w}
    sfx=[f for f in fl if rules[f][0]=='SFX'];pfx=[f for f in fl if rules[f][0]=='PFX']
    sforms=set()
    for f in sfx:sforms.update(apply(w,f))
    forms|=sforms
    for p in pfx:
        for base in [w]+[x for f in sfx if rules[f][1] and rules[p][1] for x in apply(w,f)]:
            forms.update(apply(base,p))
    words|=forms
print('expanded',len(words))
lower=set(x for x in words if re.fullmatch(r"[a-z]+(?:'[a-z]+)?",x))
proper=set(x for x in words if re.fullmatch(r"[A-Z][a-z]+",x))
print('lower',len(lower),'proper',len(proper))
from spellchecker import SpellChecker
fq=SpellChecker().word_frequency.dictionary
json.dump({'lower':sorted(lower),'proper':sorted(proper),'fq':{w:fq.get(w.lower(),0) for w in lower|set(p.lower() for p in proper)}},open('raw.json','w'))
import collections
c=[fq.get(w,0) for w in lower]
for th in [0,1,5,10,20,50]:print(th,sum(1 for x in c if x>th))
