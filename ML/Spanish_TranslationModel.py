from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
tokenizer = AutoTokenizer.from_pretrained("Helsinki-NLP/opus-mt-en-es")
model = AutoModelForSeq2SeqLM.from_pretrained("Helsinki-NLP/opus-mt-en-es")

with open('example.srt.txt') as f:
    lines = f.readlines()
    
for i in range(len(lines)):
    if lines[i][0].isalpha():
        text = lines[i]
        text_ids = tokenizer(text, return_tensors="pt").input_ids
        outputs = model.generate(input_ids=text_ids, num_beams=5, num_return_sequences=1)
        lines[i] = tokenizer.batch_decode(outputs, skip_special_tokens=True)[0] + "\n"
        
with open('example2.srt.txt', 'w') as f:
    for line in lines:
        f.write(line)