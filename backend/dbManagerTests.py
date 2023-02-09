import unittest
from dbManager import *
from SRE import *

#tests for the dbManager class, (basically testing the database as well)
class TestdbManager(unittest.TestCase):

    def test_add_user(self):
        dbmanager = dbManager()
        pref = []
        sre = SRE("id13482", "ms",pref, "michael", "islamov",1)
        dbmanager.add_user(sre)
        sre = dbmanager.get_user_byname("michael", "islamov")
        self.assertEqual(sre.get_first_name(),"michael")
        self.assertEqual(sre.get_last_name(),"islamov")
        self.assertEqual(sre.get_id(),"id13482")

if __name__ == '__main__':
    unittest.main()