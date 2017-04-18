npm run build
cp favicon.ico dist
zip dist.zip -r dist
rm -rf ../construction/dist.dash/*
mv dist.zip ../construction/dist.dash 
cd ../construction/dist.dash && git pull && unzip dist.zip && cd dist && mv * ../ && cd ../ && rm -rf dist.zip && rm -rf dist && git add . && git commit -a -m 'constrution' && git push -u origin master
