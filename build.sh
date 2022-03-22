ARCHIVE_NAME="artifacts"

build_archive (){
	echo "Building archive ..."

	if [ ! -f ./$ARCHIVE_NAME.zip ];
	then
	    echo "File not found!"
	else
	echo "File exist. Removing"
	rm ./$ARCHIVE_NAME.zip
	fi

	zip -r ./$ARCHIVE_NAME.zip ./index.html ./game.js ./game.css ./branding ./media ./favicon.ico -x "*.zip*" -x "*.git*" -x "*.psd*" -x "*.xcf*" -x "*.aif*" -x "*.tiff*" -x "*.au*" -x "*.txt*" -x "*.bat*" -x "*.htaccess" -x "*.DS_Store"

	echo "Done"
}

build_archive_promo (){
	echo "Building archive ..."

	if [ ! -f ./$ARCHIVE_NAME-promo.zip ];
	then
	    echo "File not found!"
	else
	echo "File exist. Removing" 
	rm ./$ARCHIVE_NAME-promo.zip
	fi

	zip -r ./$ARCHIVE_NAME-promo.zip ./media/graphics/promo/

	echo "Done"
}

build_archive_webaudio (){
	echo "Building archive ..."

	if [ ! -f ./$ARCHIVE_NAME.zip ];
	then
	    echo "File not found!"
	else
	echo "File exist. Removing"
	rm ./$ARCHIVE_NAME.zip
	fi

	zip -r ./$ARCHIVE_NAME.zip ./webaudio-context-patch.js ./index.html ./game.js ./game.css ./branding ./media -x "*.zip*" -x "*.git*" -x "*.psd*" -x "*.xcf*" -x "*.aif*" -x "*.tiff*" -x "*.au*" -x "*.txt*" -x "*.bat*" -x "*.jar*" -x "*.py*" -x "*.sh*" -x "*.php*" -x "*.htaccess" -x "*.DS_Store"

	echo "Done"
}

sh push.sh -b
build_archive
