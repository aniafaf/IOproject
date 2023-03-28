import re

name_pattern = r'^[A-Z][a-z]{0,149}$'
email_pattern = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'
username_pattern = r'^[a-zA-Z0-9\_\-\+\.]{1,150}$'
password_pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$'


def validate_name(name):
    if re.fullmatch(name_pattern, name) is None:
        raise ValueError(f'The {name} is not a valid name')

    return True


def validate_email(email):
    if re.fullmatch(email_pattern, email) is None:
        raise ValueError(f'The {email} is not a valid email address')

    return True


def validate_username(username):
    if re.fullmatch(username_pattern, username) is None:
        raise ValueError(f'Username must contain: minimum one character, only upper and lower case letters '
                         f'and only _, -, ., + symbols',)

    return True


def validate_password(password):
    if re.fullmatch(password_pattern, password) is None:
        raise ValueError(f'Password must contain: minimum eight characters, at least one uppercase letter, '
                         f'one lowercase letter and one number')

    return True


def validate_registration(form):
    email = form['email']
    username = form['username']
    password = form['password']
    first_name = form['first_name']
    last_name = form['last_name']
    validate_email(email)
    validate_username(username)
    validate_password(password)
    validate_name(first_name)
    validate_name(last_name)


