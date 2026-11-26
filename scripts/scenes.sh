#!/bin/sh
# Zieht die Standbilder für Landingpage und PDF aus dem finalen Erklärvideo.
# Aufruf: sh scripts/scenes.sh "/Pfad/zu/explainer_test-604_h264.mp4"
set -eu
video="$1"
out="$(dirname "$0")/../public/scenes"
mkdir -p "$out"
while read -r name time; do
  ffmpeg -nostdin -v error -y -ss "$time" -i "$video" -frames:v 1 -vf "crop=1904:1070:8:5,scale=1440:810" -q:v 3 "$out/$name.jpg"
done <<LIST
kit 25.5
stir 52
notyet 55
rinse 44.3
rest 67.5
blow 106
insert 69.8
pull 70.75
label 36.2
drink 82
nowater 90.5
symptoms 93
sleeve 131.5
form 136.9
counter 141.5
again 109
record 115
LIST
# Röhrchen nach rechts rücken, damit die Nummer in der Ecke frei steht
ffmpeg -nostdin -v error -y -ss 104 -i "$video" -frames:v 1 -vf "crop=1904:1070:8:5,format=rgb24,pad=iw+200:ih:200:0,fillborders=left=200:mode=smear,crop=1904:1070:0:0,scale=1440:810" -q:v 3 "$out/times.jpg"

# Testkit: einzelne Teile vom Tisch, auf 3:2 erweitert (Name, Breite:Höhe:x:y)
while read -r name crop; do
  ffmpeg -nostdin -v error -y -ss 29.4 -i "$video" -frames:v 1 -vf "format=rgb24,crop=$crop,pad=max(iw\\,ceil(ih*1.5)):max(ih\\,ceil(iw/1.5)):(ow-iw)/2:(oh-ih)/2:0xe27449,scale=720:480" -q:v 2 "$out/$name.jpg"
done <<LIST
kit-tubes 530:270:345:170
kit-sleeves 390:260:895:200
kit-mouthpiece 270:395:1340:185
kit-protocol 350:410:295:445
kit-bag 335:425:655:490
kit-sachet 300:200:1345:590
LIST

# Vorbereitung: einzelne Symbole, auf 55:30 erweitert (Name, Zeit, Breite:Höhe:x:y, Grund)
# prep-smoke ist ein Platzhalter, bis ein eigenes Bild vorliegt.
while read -r name time crop color; do
  ffmpeg -nostdin -v error -y -ss "$time" -i "$video" -frames:v 1 -vf "format=rgb24,crop=$crop,pad=ceil(ih*1.35*55/30):ceil(ih*1.35):(ow-iw)*0.5:(oh-ih)*0.85:$color,scale=1100:600" -q:v 2 "$out/$name.jpg"
done <<LIST
prep-antibiotics 11.4 360:420:231:282 0xC8EEFA
prep-food 11.4 360:420:1335:282 0xC8EEFA
prep-drink 11.4 360:420:597:282 0xC8EEFA
prep-stomach 93 420:350:1300:75 0xF7C4CB
prep-gut 93 420:350:1300:675 0xF7C4CB
prep-smoke 88 562:660:331:213 0xF6C8D0
LIST

ffmpeg -nostdin -v error -y -ss 2 -i "$video" -frames:v 1 -vf scale=1920:-2 -q:v 3 "$out/../thumbnail.jpg"
