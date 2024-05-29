def time_to_seconds(transfer_time):
    if transfer_time < 60:
        time_in_seconds = transfer_time * (10**5)
        time_in_seconds = int(time_in_seconds)
        return(time_in_seconds)



def transfer_time(file_size, unit="KiB", ethernet_speed=10):
    if unit == "KiB":
        file_size = file_size * 1024 * 8 / 1000000
        final_time = file_size / ethernet_speed
        return(final_time)
    elif unit == "MiB":
        file_size = file_size * 1024 * 1024 * 8 / 1000000
        final_time = file_size / ethernet_speed
        return(final_time)
    elif unit == "GiB":
        file_size = file_size * 1024 * 1024 * 1024 * 8 / 1000000
        final_time = file_size / ethernet_speed
        return(final_time)
    else:
        print("špatné jednotky")

print(time_to_seconds(transfer_time(1000, "GiB", 50)))