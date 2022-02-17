
#!/usr/bin/env sh

set -e
# git push;
# node .bin/changeBase.js /just-react/;

npm run build;

cd dist
git init
git add -A
git commit -m 'deploy'

git remote add origin git@github.com:novlan1/lantern-game.git
git push -u -f origin master:gh-pages

cd -

# rm -rf dist

# node .bin/changeBase.js