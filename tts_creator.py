import os
import edge_tts
import asyncio 

async def main():
    my_dir="images"
    a=os.listdir(my_dir)

    #put all in a list, made originally to get raw file names for javascript 
    out = [ ]

    voice_str : str = "en-US-AndrewNeural"
    out_dir : str = "audio/"
    for file in a: 
        new_part = [ ]
        country_name : str = file.split("_")[-1][0:-4]
        new_part.append(country_name)
        new_part.append(file)
        out.append(new_part)

        tts = edge_tts.Communicate(country_name,voice_str)
        await tts.save(f"{out_dir}{country_name}.mp3")




    #take all names and generate tts for them

if __name__ == "__main__":
    asyncio.run(main())