# Claude import: Game Lab heroes and Robot Builder

Source: Shop-Class-v0.5.0-New-Workshops-Package(2).zip, supplied by John. Compared against the earlier sound-fix ZIP: existing writing/money/trail extension bytes were identical. Only Robot Builder JS/CSS and the Game Lab core hunks were new. Merged onto v0.10.0 rather than replacing current standalone HTML.

Preserved the current detailed person painter, all bicycle lessons and covers, v0.9.1 sound, existing lesson IDs and isolated Worker/iframe runners. Added player.look and a captured owner-specific player.robot design to serialized state. No extra storage, DOM or network access was granted to learner code.

Fixes beyond the import: normalize robot parts, guard name/save against profile switching, preserve drafts/resume, reject fourth sensors with feedback, pad the SVG for the claw, and clarify simplified engineering assumptions. Solar panels cannot replenish batteries at night, but stored energy can still work; runtime depends on capacity/load. The stated model small solar pack lacks night-mission reserve. A camera needs software and suitable lighting; the night example is a known waypoint on a floodlit path. Magnetic lift applies to the stated magnetic-steel wrench rather than every steel alloy or every metal.

References:
- US Department of Energy, Battery Power for Your Residential Solar Electric System: https://www1.eere.energy.gov/solar/pdfs/31689.pdf
- Australian Government, Batteries: https://www.energy.gov.au/solar/get-know-solar-technology/batteries
- American Chemical Society, Metals and Magnetism: https://www.acs.org/content/dam/acsorg/education/resources/k-8/science-activities/characteristicsofmaterials/magnetsmetals/metals-and-magentism-science-for-kids.pdf

Validation: tests/robot-builder.cjs and tests/browser-robot.cjs, plus all existing regressions and browser checks. Physical-device speech/printing remain unverified; the user-confirmed working sound implementation was left unchanged.
