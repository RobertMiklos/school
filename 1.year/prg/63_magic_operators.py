class book:
    def __init__(self, title, author, num_pages):
        self.title = title
        self.author = author
        self.num_pages = num_pages

    def __add__(self, other):
        return self.num_pages + other.num_pages

    def __gt__(self, other):
        return self.num_pages > other.num_pages

    def __eq__(self, other):
        return self.author == other.author

book1 = book("Harry Potter", "J.K. Rolling", 640)
book2 = book("The Hobbit","J.K.K. Tolkien", 350)
book3 = book("Juliet and Romeo", "Shakespear",270)
book4 = book("Mein Khampf", "J.K. Rolling", 150)

print(book2 + book3)
print(book1 > book2)
print(book1 == book4)
