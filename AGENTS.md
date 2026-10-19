# Working on Shop Class

- Treat this repository's `index.html` as the current application source. Preserve the standalone export until a deliberate modularization change is requested.
- Preserve existing learner progress IDs and the `shopclass.v1` storage key. Any migration must preserve earned XP and avoid guessing ownership of ambiguous historical records.
- Keep all learner projects and delayed saves associated with their captured profile owner. Switching profiles must not copy or overwrite another learner's work.
- Keep learner JavaScript, Python and web previews isolated. Do not execute learner JavaScript on the parent page or add network/storage capabilities to learner runners.
- Keep runtime assets embedded or local; avoid required CDNs and external services for lessons.
- Run `npm test` for behavior changes. Use actual browser/device testing when available; clearly distinguish it from Node/DOM/canvas checks.
- Test entry actions from a fresh profile, not only after a mission has initialized the corresponding lab.
- Make future changes on `development` or feature branches. Do not change repository visibility or hosting audience without the owner's instruction.
- Do not commit learner progress backups, credentials or local runtime artifacts.
