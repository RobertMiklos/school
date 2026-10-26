class Graph:
    def __init__(self, directed=False):
        self.directed = directed
        self.nodes = []       
        self.edges = []       # (u, v, vaha)

    def add_node(self, node):
        if node not in self.nodes:
            self.nodes.append(node)

    def add_nodes_from(self, node_list):
        for node in node_list:
            self.add_node(node)

    def add_edge(self, u, v, weight=None):
        self.add_node(u)
        self.add_node(v)
        self.edges.append((u, v, weight))

    def add_edges_from(self, edge_list):
        for edge in edge_list:
            if len(edge) == 3:
                self.add_edge(edge[0], edge[1], edge[2])
            elif len(edge) == 2:
                self.add_edge(edge[0], edge[1])

    def remove_node(self, node):
        if node in self.nodes:
            self.nodes.remove(node)
            self.edges = [e for e in self.edges if e[0] != node and e[1] != node]

    def remove_edge(self, u, v):
        self.edges = [e for e in self.edges if not (e[0] == u and e[1] == v)]
        if not self.directed:
            self.edges = [e for e in self.edges if not (e[0] == v and e[1] == u)]

    def print_adjacency_matrix(self):
        if not self.nodes:
            print("Graf je prázdný, matice neexistuje.")
            return

        n = len(self.nodes)
        matrix = [[0] * n for _ in range(n)]

        node_to_idx = {node: i for i, node in enumerate(self.nodes)}

        for u, v, w in self.edges:
            i = node_to_idx[u]
            j = node_to_idx[v]
            value = w if w is not None else 1
            matrix[i][j] = value

            if not self.directed:
                matrix[j][i] = value

        print("\n--- MATICE SOUSEDNOSTI ---")
        header = "    " + " ".join(f"{str(node):>4}" for node in self.nodes)
        print(header)
        print("    " + "-" * (len(header) - 4))

        for i, node in enumerate(self.nodes):
            row_str = f"{str(node):>2} |"
            for j in range(n):
                val = matrix[i][j]
                if isinstance(val, float):
                    row_str += f"{val:>5.1f}"
                else:
                    row_str += f"{val:>5}"
            print(row_str)
        print("---------------------------\n")

    def print_matrix(self):
        self.print_adjacency_matrix()

    def analyze(self):
        print("--- ANALÝZA GRAFU ---")
        print(f"Počet uzlů: {len(self.nodes)}")
        print(f"Počet hran: {len(self.edges)}")
        print(f"Orientovaný: {'Ano' if self.directed else 'Ne'}")

        is_weighted = any(w is not None for u, v, w in self.edges)
        print(f"Ohodnocený: {'Ano' if is_weighted else 'Ne'}")

        loop_count = sum(1 for u, v, w in self.edges if u == v)
        print(f"Má smyčky: {'Ano (' + str(loop_count) + ')' if loop_count > 0 else 'Ne'}")

        has_cycles = False
        if not self.directed:
            neighbors = {n: [] for n in self.nodes}
            for u, v, w in self.edges:
                neighbors[u].append(v)
                if u != v:
                    neighbors[v].append(u)
            
            visited = set()
            for start in self.nodes:
                if start not in visited:
                    nodes_in_comp = 0
                    edges_in_comp = 0
                    stack = [start]
                    visited.add(start)
                    while stack:
                        curr = stack.pop()
                        nodes_in_comp += 1
                        for neighbor in neighbors[curr]:
                            edges_in_comp += 1
                            if neighbor not in visited:
                                visited.add(neighbor)
                                stack.append(neighbor)
                    if (edges_in_comp // 2) >= nodes_in_comp:
                        has_cycles = True
                        break
        print(f"Obsahuje cykly: {'Ano' if has_cycles else 'Ne'}")

        V = len(self.nodes)
        E = len(self.edges)
        if V < 5:
            is_planar = "Ano"
        elif E <= (3 * V - 6) and loop_count == 0:
            is_planar = "ano"
        else:
            is_planar = "Ne"
        print(f"Planární: {is_planar}")

        degrees = [0] * len(self.nodes)
        node_map = {node: i for i, node in enumerate(self.nodes)}
        for u, v, w in self.edges:
            if u in node_map: degrees[node_map[u]] += 1
            if v in node_map and u != v: degrees[node_map[v]] += 1

        max_degree = max(degrees) if degrees else 0
        chromatic_estimate = min(max_degree + 1, V)
        print(f"Chromatické číslo: {chromatic_estimate}")
        print("---------------------\n")


if __name__ == "__main__":
    g = Graph(directed=False)

    g.add_nodes_from([1, 2, 3, 4])

    g.add_edge(1, 2, weight=5)
    g.add_edge(2, 3)
    g.add_edge(3, 4)
    g.add_edge(4, 1)

    g.print_matrix()

    g.analyze()