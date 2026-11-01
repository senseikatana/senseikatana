#!/usr/bin/env node
/**
 * Executable entry point for the `kai` command (katanakitAI). Importing the
 * CLI module stays side-effect free; this file is the only place that runs it.
 */
import { runCli } from "./index.js";

void runCli();
