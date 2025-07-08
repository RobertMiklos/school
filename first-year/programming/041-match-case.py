code = 502

match code:
    case 200 | 201:
         print("OK")
    case 300 | 307:
         print("Redirect")
    case 400 | 401:
         print("Bad Request")
    case 500 | 502:
         print("Internal Server Error")