from bs4 import BeautifulSoup 
import requests 
import time 

def main():
    ROOT_FLAG_SITE : str = "https://en.wikipedia.org/"
    ROOT_SITE : str = "https://en.wikipedia.org/wiki/List_of_national_flags_of_sovereign_states"
    requed_info =requests.get(ROOT_SITE)
    souped_req = BeautifulSoup(requed_info.text)

    #look for table 
    table=souped_req.find("table")
    all_links = table.find_all("a")
    flag_urls : list[str] = []
    for tag in all_links:
        href = tag.get('href')

        #/wiki/
        if href[0]=="/" and href[6]=="F" and href[-4:]==".svg":
            flag_urls.append(f"{href}")
    
    failed = [ ]
    for i in range(len(flag_urls)):
    #for link in flag_urls:
        try:
            flag_site=requests.get(f"{ROOT_FLAG_SITE}{flag_urls[i]}")
            #site has some kind of DDOS protection so this makes it agreeable 
            time.sleep(2)
            found_site = BeautifulSoup(flag_site.content)
            print(flag_urls[i])
            found_img = found_site.find_all('div',id="file")[0]

            SRC : str = found_img.find('a').get('href')
            # souped_div = BeautifulSoup(found_img[0])
            # link=souped_div.find('a')
            # print(link)

            # print(found_img)
            flag_image=requests.get(f"https:{SRC}")

            img_name = "images/"+flag_urls[i].split(":")[1]
            with open(img_name, "wb") as file:
                file.write(flag_image.content)
        except Exception as e:
            print(f"Failed to process: {flag_urls[i]}")
            print(e)
            failed.append(flag_urls[i])
    
    print("*"*30)
    print(failed)

    #iterate over first column of table, get flag URL for each 
    


if __name__ == "__main__":
    main()