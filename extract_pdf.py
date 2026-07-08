import fitz
import os

pdf_path = "/Users/deckmount/presentationcontent/Portable ECG_Final_28,apr.pdf"
output_dir = "/Users/deckmount/presentationcontent/app/src/assets/extracted/"

doc = fitz.open(pdf_path)

# Extract Text
text = ""
for page in doc:
    text += page.get_text()

with open("/Users/deckmount/presentationcontent/pdf_content.txt", "w") as f:
    f.write(text)

# Extract Images
for i in range(len(doc)):
    for img in doc.get_page_images(i):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        image_name = f"pdf_img_{i}_{xref}.{image_ext}"
        with open(os.path.join(output_dir, image_name), "wb") as f:
            f.write(image_bytes)

print(f"Extracted text and {len(doc)} pages of images.")
