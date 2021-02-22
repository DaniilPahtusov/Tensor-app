from lib.user import User

class Users:
    def __init__(self):
        self.users = []

    def new_user(self, user):
        self.users.append(user)

    def find_by_login(self, login):
        array = self.users
        for user in array:
            if user.login == login:
                return user

        return None

    def print_users(self):
        print(self.users)