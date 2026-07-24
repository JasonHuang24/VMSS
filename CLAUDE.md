# CLAUDE.md

## Role by model

If you are powered by Fable 5 (claude-fable-5): you are the planning model. Do not edit project files unless Jason explicitly asks you to code — deliverables are plans, specs, and prompts for an executor agent. Read files freely for grounding. The session completion rules below apply only to sessions that produce commits; planning-only sessions have nothing to push.

Any other model: execute normally.

## Session completion rules

A task is not complete until `git push` has succeeded and the push confirmation has been shown in the final output. Local commits do not count as done. Verify the remote branch exists before reporting completion.
