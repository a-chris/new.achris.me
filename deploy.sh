bundle exec bridgetown build -e production
ssh ubuntu@212.227.109.153 'rm -rf /home/ubuntu/achris/output'
echo "folder deleted, uploading started"
scp -prq output ubuntu@212.227.109.153:/home/ubuntu/achris
