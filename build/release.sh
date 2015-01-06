if [[ -n $(git status --porcelain) ]];
then
  echo "Repo is dirty. please commit before releasing";
  exit 1;
fi

echo "rebuilding"
make build

if [[ -n $(git status --porcelain) ]];
then
  echo "commiting source"
  git add -A
  git commit -m "Rebuilt"
fi

if [ -z "$inc" ];
then
  inc="patch";
fi

echo "update version"
npm version $inc

echo "pushing changes"
git push origin master
git push origin --tags

echo "publishing to NPM"
npm publish