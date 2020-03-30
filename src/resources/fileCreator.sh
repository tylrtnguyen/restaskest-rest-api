#/usr/bin/

echo "Which folder do you want to create files at?"
read folder

mkdir $folder
cd ./${folder}
touch "${folder}.model.js"
touch "${folder}.controllers.js"
touch "${folder}.router.js"

ls -a
