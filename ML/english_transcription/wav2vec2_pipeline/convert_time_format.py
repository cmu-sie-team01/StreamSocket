### convert time format from (float) seconds to (string) hours:minutes:seconds,milliseconds 00:00:00,000 format
### using brute force solution to display leading zeros bc I was unable to find an existing library
def convert_time_format(time):
    hh = int(time // 3600)
    ### check if recording is longer than 100 hours but this should be filtered in the front-end regardless
    if hh > 100:
        raise ValueError('Recording is longer than 100 hours') 
    time = time % 3600
    mm = int(time // 60)
    time = time % 60
    ss = int(time // 1)
    time = time - ss
    output_str = ''
    for var in [hh, mm, ss]:
        ### extra colon was added after seconds and will be removed when added milliseconds
        if var == 0:
            output_str += '00:'
        elif var < 10:
            output_str += '0' + str(var) + ':'
        else:
            output_str += str(var) + ':'
    ms = int(time * 1000 // 1)
    if ms == 0:
        output_str = output_str[:-1] + ',' + '000'
    elif ms < 10:
        output_str = output_str[:-1] + ',' + '00' + str(ms)
    elif ms < 100:
        output_str = output_str[:-1] + ',' + '0' + str(ms)
    else:
        output_str = output_str[:-1] + ',' + str(ms)
    # print("time conversion result:", output_str)
    return output_str