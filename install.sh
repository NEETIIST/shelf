

# if apt-get update error
sudo vim /etc/resolvconf/resolv.conf.d/base
#    nameserver 8.8.8.8
#    nameserver 8.8.4.4
sudo resolvconf -u

#remote edit files on atom
curl -o /usr/local/bin/rtom https://raw.githubusercontent.com/aurora/rmate/master/rmate
sudo chmod +x /usr/local/bin/rtom

# isntall dependencies
sudo apt-get update
sudo apt-get install git

# intall nodejs
wget -qO- https://deb.nodesource.com/setup_4.x | sudo bash -
sudo apt-get install nodejs

# install mongoDB
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
service mongod status

# install forever
sudo npm install -g forever

# content folder
mkdir shelf
sudo chmod 777 shelf

# init data
echo "INIT DATA"
echo "RUN: node server/config/init_data.js"
echo "RUN: node server/services/fenix/init_teachers.js"
echo " "

# start server
echo "START SERVER"
echo "RUN: sudo forever start server.js"
echo " "
