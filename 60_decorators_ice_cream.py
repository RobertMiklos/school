def add_sprickles(func):
    def wrapper():
        print("Added sprinkles.")
        func()
    return wrapper

@add_sprickles
def get_ice_cream():
    print("Here is your ice cream.")

get_ice_cream()