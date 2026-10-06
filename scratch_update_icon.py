import base64
import io
from PIL import Image

img = Image.open('c:/Users/azaan/e_commerce_web/public/images/avatar.png').resize((128, 128), Image.Resampling.LANCZOS)
buf = io.BytesIO()
img.save(buf, format='PNG')
b64_str = base64.b64encode(buf.getvalue()).decode('utf-8')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <image href="data:image/png;base64,{b64_str}" width="128" height="128" />
</svg>
'''

with open('c:/Users/azaan/e_commerce_web/src/app/icon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print('Updated src/app/icon.svg successfully!')
