### split a (string) sentence into (array of strings) smaller phrases
def split_phrases(text, char_limit):
    text_length = len(text)
    output_arr = []
    c = 0
    while c < text_length:
        if text_length - c > char_limit:
            offset = c + char_limit
            ### find end of last completed word
            while text[offset] != ' ':
                offset -= 1
                ### if transcribed word is longer than char_limit, override and just output it
                if offset < c:
                    offset = c + char_limit
                    break
            output_arr.append(text[c:offset])
            c = offset + 1
        else:
            output_arr.append(text[c:])
            break
    return output_arr

### split a start, end segment into (array of [start, end]) smaller segments
def split_segments(start, end, periodic_limit):
    segment_length = end - start
    output_arr = []
    l = 0
    while l < segment_length:
        if segment_length - l > periodic_limit:
            output_arr.append([l + start, l + start + periodic_limit])
            l += periodic_limit
        else:
            output_arr.append([l + start, end])
            break
    return output_arr
