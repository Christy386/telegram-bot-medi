# Install all dependencies
npm i
#!/bin/bash

read -p "Do you want to create and configure the .env file? (y/n) " answer

if [ "$answer" != "${answer#[Yy]}" ]; then
    # Ask the user for the values of each parameter
    read -p "Enter your Telegram Bot API key: " BOT_KEY
    read -p "Enter your database host: " DB_HOST
    read -p "Enter your database username: " DB_USER
    read -p "Enter your database password: " DB_PASSWORD
    read -p "Enter your database name: " DB_DATABASE

    # Write the parameter values to the .env file
    echo "BOT_KEY=$BOT_KEY" > ./.env
    echo "DB_HOST=$DB_HOST" >> ./.env
    echo "DB_USER=$DB_USER" >> ./.env
    echo "DB_PASSWORD=$DB_PASSWORD" >> ./.env
    echo "DB_DATABASE=$DB_DATABASE" >> ./.env

    echo "Successfully created .env file."
else
    echo "No file created."
fi

# Write the contents of the telegram-bot.service file to the file
cat << EOF > /etc/systemd/system/telegram-bot.service
[Unit]
Description=Telegram Bot

[Service]
ExecStart=/usr/bin/node /root/telegram-bot-medi/index
Restart=always
User=root
Environment=PATH=/usr/bin:/usr/local/bin
WorkingDirectory=/root/telegram-bot-medi

[Install]
WantedBy=multi-user.target
EOF

echo "Successfully created telegram-bot.service file."

systemctl start telegram-bot
systemctl status telegram-bot
echo "Successfully installed"
