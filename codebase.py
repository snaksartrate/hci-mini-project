import os
import sys

OUTPUT_FILE = "codebase.txt"
FILE_SEPARATOR = "=" * 100
CONTENT_SEPARATOR = "-" * 100
DEFAULT_ALLOWED_EXTENSIONS = {
    # Python
    ".py",

    # JavaScript / TypeScript
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".mjs",
    ".cjs",

    # Web
    ".html",
    ".css",
    ".scss",
    ".sass",
    ".less",

    # Configs
    ".json",
    ".yaml",
    ".yml",
    ".toml",
    ".ini",
    ".env",
    ".gitignore",

    # Backend / Server
    ".sql",

    # Documentation
    ".md",
    ".txt",

    # C / C++
    ".c",
    ".cpp",
    ".cc",
    ".cxx",
    ".h",
    ".hpp",

    # Java
    ".java",

    # C#
    ".cs",

    # Go
    ".go",

    # Rust
    ".rs",

    # PHP
    ".php",

    # Shell
    ".sh",
    ".bat",
    ".ps1",

    # XML / Misc
    ".xml",
    ".svg",
}


def should_include_file(filename: str, allowed_exts: set[str] | None, all_types: bool) -> bool:
    if all_types:
        return True

    if allowed_exts is None:
        allowed_exts = DEFAULT_ALLOWED_EXTENSIONS

    ext = os.path.splitext(filename)[1].lower()
    return ext in allowed_exts


def dump_codebase(root_dir: str, delete_after: bool = False, allowed_exts=None, all_types: bool = False) -> None:
    output_path = os.path.join(root_dir, OUTPUT_FILE)
    script_path = os.path.abspath(__file__)

    with open(output_path, "w", encoding="utf-8") as out_file:
        for dirpath, _, filenames in os.walk(root_dir):
            for filename in filenames:
                file_path = os.path.join(dirpath, filename)

                if os.path.abspath(file_path) in {os.path.abspath(output_path), script_path}:
                    continue

                if not should_include_file(filename, allowed_exts, all_types):
                    continue

                rel_path = os.path.relpath(file_path, root_dir)

                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()
                except Exception:
                    continue

                out_file.write(FILE_SEPARATOR + "\n")
                out_file.write(f"{rel_path} begins here\n")
                out_file.write(CONTENT_SEPARATOR + "\n")
                out_file.write(content + "\n")
                out_file.write(CONTENT_SEPARATOR + "\n")
                out_file.write(f"eof {rel_path}\n")
                out_file.write(FILE_SEPARATOR + "\n\n")

                if delete_after:
                    try:
                        os.remove(file_path)
                    except Exception:
                        pass


def reconstruct_codebase(root_dir: str) -> None:
    input_path = os.path.join(root_dir, OUTPUT_FILE)

    if not os.path.exists(input_path):
        print("not found")
        return

    try:
        with open(input_path, "r", encoding="utf-8") as f:
            lines = f.readlines()
    except Exception:
        print("not found")
        return

    i = 0
    while i < len(lines):
        line = lines[i].strip()

        if line.endswith("begins here"):
            rel_path = line.replace(" begins here", "")
            file_path = os.path.join(root_dir, rel_path)

            parent_dir = os.path.dirname(file_path)
            if parent_dir:
                os.makedirs(parent_dir, exist_ok=True)

            i += 1
            if i < len(lines) and lines[i].strip() == CONTENT_SEPARATOR:
                i += 1

            content_lines = []
            while i < len(lines) and lines[i].strip() != CONTENT_SEPARATOR:
                content_lines.append(lines[i])
                i += 1

            try:
                with open(file_path, "w", encoding="utf-8") as f:
                    f.writelines(content_lines)
            except Exception:
                pass

            while i < len(lines) and not lines[i].strip().startswith("eof "):
                i += 1

        i += 1


def parse_extensions(arg: str):
    exts = set()
    for item in arg.split(","):
        item = item.strip().lower()
        if not item:
            continue
        if not item.startswith("."):
            item = "." + item
        exts.add(item)
    return exts


def main():
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python codebase.py --dump [ext1,ext2,... | --all-types]")
        print("  python codebase.py --pickup [ext1,ext2,... | --all-types]")
        print("  python codebase.py --reconstruct")
        sys.exit(1)

    command = sys.argv[1]
    cwd = os.getcwd()

    allowed_exts = None
    all_types = False

    if command in {"--dump", "--pickup"} and len(sys.argv) >= 3:
        arg = sys.argv[2]
        if arg == "--all-types":
            all_types = True
        else:
            allowed_exts = parse_extensions(arg)

    if command == "--dump":
        dump_codebase(cwd, delete_after=False, allowed_exts=allowed_exts, all_types=all_types)

    elif command == "--pickup":
        dump_codebase(cwd, delete_after=True, allowed_exts=allowed_exts, all_types=all_types)

    elif command == "--reconstruct":
        reconstruct_codebase(cwd)

    else:
        print("Invalid command")
        sys.exit(1)


if __name__ == "__main__":
    main()