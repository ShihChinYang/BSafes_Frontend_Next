#!/bin/bash

set -e  # Exit on error

# ==== CONFIG ====
REPO_URL="https://github.com/antarsaha9/excalidraw.git"
BRANCH="custom-font-feature"
PACKAGE_NAME="excalidraw"  # name as in package.json
PACKAGE_PATH="packages/excalidraw"  # relative to repo root
WORKDIR="./temp-mono-repo"
APP_DIR=$(pwd)  # assumes you're running this from your app root

echo "🚀 Cloning $REPO_URL..."
rm -rf "$WORKDIR"
git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$WORKDIR"

cd "$WORKDIR/$PACKAGE_PATH"

echo "📦 Installing and building $PACKAGE_NAME..."
yarn install
yarn build:esm

echo "📦 Packing $PACKAGE_NAME..."
PKG_FILE=$(yarn pack --filename "$APP_DIR/$PACKAGE_NAME.tgz" --silent)

cd "$APP_DIR"

echo "📥 Installing $PACKAGE_NAME.tgz into your project..."
npm install "./$PACKAGE_NAME.tgz"

# Optional: Clean up
rm -rf "$WORKDIR"
rm "$PACKAGE_NAME.tgz"

echo "✅ Done installing $PACKAGE_NAME!"
