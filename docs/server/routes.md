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

4. **group/<int:pk>**
	
	<int:pk> in the url is the id (primary key) of the group
	user want to see.
	- Group with given id must exist.
	- User must be logged in and be in the group in order to see
	it's content.

5. **group_list**

	Lists all group of user.
	- User must be logged in in order to see his/her list of groups.

6. **group_create**
	
	- User must be logged in in order to create group.
	- Requires body with:
	  * name of the group
 
## Constraints:
- **username**:
	* minimum one character
	* only upper or lower case letters and \_, -, ., + symbols
	* maximum 150 characters 
	* must be unique
-   **email**:
	* must be a valid email
	* must be uniqe
-   **password**:
	* minimum 8 characters
-   **first\_name, last\_name**
	* must starts with a capital letter
	* minimum one character
	* maximum 150 characters

