import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def sendmail(email_recepients):
    email_sender_account = "cowin.notify.2019@gmail.com"
    email_sender_username = "cowin.notify.2019@gmail.com"
    email_sender_password = "cowinnotify"
    email_smtp_server = "smtp.gmail.com"
    email_smtp_port = 587
    email_subject = "Cowin Notification"
    email_body = "Your Covid Slot has opened up for "
    server = smtplib.SMTP(email_smtp_server,email_smtp_port)
    server.starttls()
    server.login(email_sender_username, email_sender_password)
    for recipient in email_recepients:
        print(f"Sending email to {recipient}")
        message = MIMEMultipart('alternative')
        message['From'] = email_sender_account
        message['To'] = recipient['email_id']
        message['Subject'] = email_subject
        email_body += str(recipient['msg'])
        message.attach(MIMEText(email_body, 'html'))
        text = message.as_string()
        server.sendmail(email_sender_account,recipient['email_id'],text)
    server.quit()


 