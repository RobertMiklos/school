class Community:
    
    class Member:

        def __init__(self, member_id, nickname):
            self.__id = member_id
            self.__nick = nickname

        def get_ID(self):
            return self.__id
    
        def get_nick(self):
            return self.__nick
    
        def __str__(self):
            return f"{self.__id}: {self.__nick}"

    def __init__(self, name):
        self.__name = name
        self.__members = []

    def get_name(self):
        return self.__name

    def add_member(self,member_id, member_nickname):
        self.__members.append(self.Member(member_id, member_nickname))

    def get_members(self):
        return self.__members

                

    
aa = Community("Anonym Alko")
aa.add_member(1, "Dalibor")
aa.add_member(2, "Matěj")
aa.add_member(3, "Daniel")
print(aa.get_name())
for member in aa.get_members():
    print(member)

gang = Community("Bang")
print(gang.get_name())
gang.add_member(1, "václav")
for member in gang.get_members():
    print(member)