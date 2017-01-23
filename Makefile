all: tor-everywhere.zip

tor-everywhere.zip: manifest.json index.js icons/logo-48.png icons/logo-256.png
	zip $@ $^

.PHONY: tor-everywhere.zip
