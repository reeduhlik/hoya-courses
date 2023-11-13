
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By

import urllib.request
import json
import os

service = Service()
options = webdriver.ChromeOptions()
options.headless = True
driver = webdriver.Chrome(service=service, options=options)

USERNAME = os.environ.get('GEORGETOWN_USERNAME')
PASSWORD = os.environ.get('GEORGETOWN_PASSWORD')



first_url="https://myaccess9.georgetown.edu/BannerExtensibility/customPage/page/HOMEPAGE"
second_url = "https://bn-reg.uis.georgetown.edu/StudentRegistrationSsb/ssb/searchResults/searchResults?txt_term=202330&startDatepicker=&endDatepicker=&uniqueSessionId=ivy131690476819227&pageOffset=0&pageMaxSize=500&sortColumn=subjectDescription&sortDirection=asc"


print('Logging in...')
#use selenium to get the json from the url
driver.get(first_url)
driver.find_element(By.NAME, "j_username").send_keys(USERNAME)
driver.find_element(By.NAME, "j_password").send_keys(PASSWORD)
driver.find_element(By.NAME, "_eventId_proceed").click()

print('Waiting for Duo...')

try:
    WebDriverWait(driver, 300).until(EC.presence_of_element_located((By.ID, 'trust-browser-button')))
    driver.find_element(By.ID, "trust-browser-button").click()
    driver.get("https://bn-reg.uis.georgetown.edu/StudentRegistrationSsb/ssb/term/termSelection?mode=search")
    #wait for duo page

    print("Logged in successfully.")

    #run script to find the session storage token
    code = driver.execute_script("return window.sessionStorage.getItem('xe.unique.session.storage.id')")


    #navigate to the search page
    driver.find_element(By.CLASS_NAME, "select2-arrow").click()
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, '202410')))
    driver.find_element(By.ID, "202410").click()
    driver.find_element(By.ID, "term-go").click()

    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, 'search-go')))
    driver.find_element(By.ID, "search-go").click()

    ##now we can get the json data by looping through each page
    for i in range(0, 12):
        print(" Fetching page " + str(i))
        driver.get("https://bn-reg.uis.georgetown.edu/StudentRegistrationSsb/ssb/searchResults/searchResults?txt_term=202410&startDatepicker=&endDatepicker=&uniqueSessionId=" + code + "&pageOffset=" + str(500*i) + "&pageMaxSize=500&sortColumn=subjectDescription&sortDirection=asc")
        print("  Page " + str(i) + " fetched.")
        pre = driver.find_element(By.TAG_NAME, "pre").text
        data = json.loads(pre)

        #store the json data from the url in a file called data.json
        #currently a weird bug on page 7 where the data is empty - skip over it until Georgetown fixes it
        if i != 7:
            with open(f'./src/courseData/page{i}.json', 'w') as f:
                json.dump(data, f)
except Exception as e:
    print("Duo timed out.")
    print(e)




