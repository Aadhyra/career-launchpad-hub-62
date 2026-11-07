# Complete the pending site improvements

## User-facing work

- Make student project purchases clearly show their current state, and show PPT, source code, documentation, and demo materials only when available and unlocked. Keep demo payment explicitly labeled as demo; do not imply an unverified payment is real.
- Add a clearly marked sample certificate using the company logo, separate from real, verifiable certificates.
- Confirm student dashboard and My Courses use the signed-in account's live records and handle load failures clearly.
- Improve interview and exam flow across MCQ, coding, and HR rounds; retain webcam monitoring, choose questions by department/round where the data supports it, and avoid repeats within attempts.
- Make resume and portfolio creation simpler and more polished, with usable previews and existing save behavior preserved.
- Add the requested Careers openings and remove the unwanted hiring-process introduction; improve About page clarity and make the company motto easy to find.
- Simplify HR task instructions and proof upload while preserving task order, time limits, and eligibility rules.
- Add accessible show/hide controls to password fields across sign-in and account pages.
- Improve the AI chat experience with clearer guidance and robust error handling.
- Add a WhatsApp lead contact only after the business number is supplied; the number is not available yet.

## Technical approach

- Follow existing React, Tailwind, Lovable Cloud, and component patterns; preserve current branding, authentication, role checks, and ownership protections.
- Inspect and reuse current payment, storage, interview, and form flows. Do not weaken payment verification or expose private uploads. Avoid database changes unless the inspected schema makes them necessary.
- Verify relevant project tests and inspect current preview diagnostics; exercise core public and student-facing flows where the available session permits.

## Completion notes

- The WhatsApp contact cannot be wired until the user provides the WhatsApp Business number.
- Do not present placeholder project assets, sample credentials, or a demo payment as a real purchase or issued certificate.
