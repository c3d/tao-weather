
MODINSTDIR = weather

include(../modules.pri)

OTHER_FILES = weather.xl
OTHER_FILES += doc/weather.doxy.h doc/Doxyfile.in
OTHER_FILES += weather.js

install_js.files = weather.js
install_js.path = $${MODINSTPATH}
QMAKE_EXTRA_TARGETS += install_js

install_icons.files = icons/*.png
install_icons.path = $${MODINSTPATH}/icons
QMAKE_EXTRA_TARGETS += install_icons

INSTALLS    += thismod_icon
INSTALLS    -= thismod_bin
INSTALLS    += install_js
INSTALLS    += install_icons

QMAKE_SUBSTITUTES = doc/Doxyfile.in
QMAKE_DISTCLEAN = doc/Doxyfile
DOXYFILE = doc/Doxyfile
DOXYLANG = en,fr
include(../modules_doc.pri)
