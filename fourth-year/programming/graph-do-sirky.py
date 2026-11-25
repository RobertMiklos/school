matrix = [[0, 0, 1, 0],
          [0, 0, 1, 1],
          [1, 1, 0, 1],
          [0, 1, 1, 0]]

class Graph():
    def __init__(self, target):
        self.target = target
        self.matrix = matrix
        self.to_visit = []
        self.visited = []

    def bsfFunc(self):
        