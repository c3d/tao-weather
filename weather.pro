# ******************************************************************************
# weather.pro                                                      Tao3D project
# ******************************************************************************
#
# File description:
#
#
#
#
#
#
#
#
# ******************************************************************************
# This software is licensed under the GNU General Public License v3
# (C) 2014,2019, Christophe de Dinechin <christophe@dinechin.org>
# ******************************************************************************
# This file is part of Tao3D
#
# Tao3D is free software: you can r redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Tao3D is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Tao3D, in a file named COPYING.
# If not, see <https://www.gnu.org/licenses/>.
# ******************************************************************************

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
