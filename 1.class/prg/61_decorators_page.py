def print_decorator(func):
    def wrapper(*args):
        print("***")
        func(*args)
        print("***")
        print("END OF PAGE")
    return wrapper

@print_decorator
def invoice(num):
    print("INVOICE #" + num)

invoice(input())