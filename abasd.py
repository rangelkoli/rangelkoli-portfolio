import os
import time
import shutil

DOWNLOADS_FOLDER = os.path.expanduser('~/Downloads')
RESUME_FOLDER = os.path.expanduser('~/Desktop/Job Search/Resumes')
COVER_LETTER_FOLDER = os.path.expanduser('~/Desktop/Job Search/CoverLetters')

os.makedirs(RESUME_FOLDER, exist_ok=True)
os.makedirs(COVER_LETTER_FOLDER, exist_ok=True)

def get_dest_folder(filename):
    lower = filename.lower()
    if 'cover letter' in lower:
        return COVER_LETTER_FOLDER
    elif 'resume' in lower:
        return RESUME_FOLDER
    return None

def move_files():
    for filename in os.listdir(DOWNLOADS_FOLDER):
        filepath = os.path.join(DOWNLOADS_FOLDER, filename)
        if os.path.isfile(filepath):
            dest_folder = get_dest_folder(filename)
            if dest_folder:
                dest_path = os.path.join(dest_folder, filename)
                shutil.move(filepath, dest_path)
                print(f"Moved: {filename} to {dest_folder}")

if __name__ == "__main__":
    print("Monitoring Downloads folder...")
    while True:
        move_files()
        time.sleep(5)