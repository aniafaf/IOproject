# Route documentation

## List of routes with required paramters:

1. **signup (POST method)**

	Requires body with: 
	  - first\_name
	  - last\_name
	  - username
	  - email
	  - passwrod

2. **login\_to (POST method)**

	Requirees body with:
	  - username
	  - password

3. **activate (PATCH method)**

	Requirees body with:
	  - token
	  - uid


## Constraints:
  - **username**:
	* minimum one character
	* only upper or lower case letters and \_, -, ., + symbols
	* maximum 150 characters 
	* must be unique
  - **email**:
	* must be a valid email
	* must be uniqe
  - **password**:
	* minimum 8 characters
  - **first\_name, last\_name**
	* must starts with a capital letter
	* minimum one character
	* maximum 150 characters

