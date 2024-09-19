text = input("Enter text.")
word = input("Enter word.")

def search(text, word):
    if word in text:
        print("Word found")
    else:
        print("Word not found")

search(text, word)