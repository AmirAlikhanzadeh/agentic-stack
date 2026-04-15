"""Standalone harness entrypoint. Use when you want full ownership of the loop."""
import sys, os

# make .agent/harness importable
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..", "..")
sys.path.insert(0, os.path.join(ROOT, ".agent", "harness"))
sys.path.insert(0, os.path.join(ROOT, ".agent", "tools"))

from conductor import run


def main():
    if len(sys.argv) < 2:
        print("usage: python run.py '<your prompt>'", file=sys.stderr)
        sys.exit(2)
    prompt = " ".join(sys.argv[1:])
    print(run(prompt))


if __name__ == "__main__":
    main()
