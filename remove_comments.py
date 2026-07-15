import re, pathlib
files = ['main.html', 'styles.css', 'script.js']
for name in files:
    path = pathlib.Path(name)
    text = path.read_text(encoding='utf-8')
    if name.endswith('.html'):
        text = re.sub(r'<!--([\s\S]*?)-->', '', text)
    if name.endswith('.css') or name.endswith('.js'):
        text = re.sub(r'/\*([\s\S]*?)\*/', '', text)
        def strip_line(line):
            i = 0
            in_s = None
            while i < len(line):
                c = line[i]
                if in_s:
                    if c == '\\' and i + 1 < len(line):
                        i += 2
                        continue
                    if c == in_s:
                        in_s = None
                    i += 1
                    continue
                if c in ('"', "'"):
                    in_s = c
                    i += 1
                    continue
                if c == '/' and i + 1 < len(line) and line[i+1] == '/':
                    return line[:i].rstrip() + '\n'
                i += 1
            return line
        text = ''.join(strip_line(line) for line in text.splitlines(True))
    path.write_text(text, encoding='utf-8')
