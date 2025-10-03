Upscaling helper

This small utility upscales images using Pillow's high-quality resampling and a gentle unsharp mask.

How to use (Windows PowerShell):

1. Install the dependency (if you don't have it already):

python -m pip install --user -r "requirements.txt"

2. Run the script to upscale your photo (adjust --scale as needed):

python "tools\upscale_image.py" --input "ahmed photo.png" --output "ahmed photo_upscaled.png" --scale 2 --sharpen

Notes:
- This is a simple pixel resampler (Lanczos). For best results on severe low-res or noisy images, consider specialized AI upscalers (ESRGAN, Real-ESRGAN, waifu2x).
- If Python isn't available on your machine, you can install it from https://www.python.org/downloads/ (make sure 'python' is on PATH).