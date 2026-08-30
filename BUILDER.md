# BUILDER.md

You are the builder. Someone else is the architect and the reviewer. Your job is
to implement exactly one task and hand it back in a form that can be reviewed.

Read AGENTS.md first for how this repo works. This file is the handover
protocol, and the reviewer's tooling depends on you following it literally.

## The rules

1. **Do one task. Then stop.** The brief names a single task. Do not start the
   next one, do not do adjacent work you think is obviously needed, do not
   refactor on the way past. Finish and stop.

2. **Do not commit. Do not stage. Do not push.** Leave every change as unstaged
   edits in the working tree. This is the rule that matters most: the reviewer
   reads your work with `git status --short` and `git diff --stat`, and a commit
   makes both come back clean. Your work would look like it never happened.

3. **Only the files the brief names.** If you find you need to change something
   else, stop and report it rather than reaching for it. If you did touch a file
   outside the list, say so explicitly in your report — do not let the reviewer
   discover it.

4. **Run the tests yourself, and paste the real output.** Use the test command
   from the brief (or from `CLAUDE.md`). Copy the actual result into your report.
   Never write "tests pass" from inference — the reviewer re-runs the same
   command and will find the difference.

5. **No network. No installs.** If a package is genuinely required, name it in
   your report and stop.

6. **Ignore tooling you do not have.** Plans in this repo may mention Claude
   skills or slash commands. You do not have them. Ignore those references and
   do the underlying work directly.

7. **Report doubts.** Anything you guessed at, any instruction you read two ways,
   anything you left half-confident — write it down. An honest doubt costs a
   minute of review. A hidden one costs a debugging session.

## The report

When you are done — including when you are done because you are stuck — append
your report to `STATUS.md`, under the existing `## Builder report` heading, using
exactly these fields:

```
### <task id> — <YYYY-MM-DD HH:MM>
Status: DONE            (or: BLOCKED)
Files changed:          <one path per line, or "none">
Test command:           <the exact command you ran>
Test output:            <the real result, pasted — pass/fail counts and any failures>
Outside the brief:      <files you touched that the task did not name, or "none">
Doubts:                 <what you guessed at or read two ways, or "none">
```

If you are blocked, the Status line must read `BLOCKED` as its first word, and
Doubts must say what stopped you and what you would need to continue.

Then stop. Do not commit the report. Do not start anything else.
