import re
import zlib
from abc import ABC, abstractmethod

class PDU(ABC):
    def __init__(self, payload: str):
        self.__payload = payload

    def get_payload(self) -> str:
        return self.__payload
    
    def set_payload(self, val: str):
        self.__payload = val

    @abstractmethod
    def is_valid(self) -> bool:
        pass


class EthFrame(PDU):
    def __init__(self, dmac: str, smac: str, eth_type: int, payload: str, fcs: int = None):
        super().__init__(payload)
        
        if not self.is_valid_mac(dmac) or not self.is_valid_mac(smac):
            raise ValueError("Neplatný formát MAC adresy!")

        self._dmac = dmac
        self._smac = smac
        self._type = eth_type
        
        if fcs is None:
            self._fcs = self.calculate_fcs()
        else:
            self._fcs = fcs

    @staticmethod
    def is_valid_mac(mac: str) -> bool:
        pattern = r"^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$"
        return bool(re.match(pattern, mac))

    @property
    def dmac(self): return self._dmac
    
    @dmac.setter
    def dmac(self, val):
        if self.is_valid_mac(val):
            self._dmac = val
            self._recalculate_fcs()
        else: raise ValueError("Neplatný formát Destination adresy.")

    @property
    def smac(self): return self._smac

    @smac.setter
    def smac(self, val):
        if self.is_valid_mac(val):
            self._smac = val
            self._recalculate_fcs()
        else: raise ValueError("Neplatný formát Source adresy.")

    @property
    def eth_type(self): return self._type

    @eth_type.setter
    def eth_type(self, val):
        self._type = val
        self._recalculate_fcs()

    # TADY BYLA CHYBA - přidáno self
    def set_payload(self, val: str):
        super().set_payload(val)
        self._recalculate_fcs()

    @property
    def fcs(self): return self._fcs

    def calculate_fcs(self) -> int:
        combined_data = f"{self._dmac}{self._smac}{self._type}{self.get_payload()}"
        return zlib.crc32(combined_data.encode('ascii')) & 0xFFFFFFFF

    def _recalculate_fcs(self):
        self._fcs = self.calculate_fcs()

    def is_valid(self) -> bool:
        return self.calculate_fcs() == self._fcs

    def __str__(self):
        return (f"[EthFrame] SRC: {self._smac} | DST: {self._dmac} | "
                f"TYPE: {hex(self._type)} | FCS: {hex(self._fcs)} | "
                f"DATA: {self.get_payload()}")

    def corrupt_data(self):
        self._PDU__payload = "Error data jsou corrupt."
        self._fcs = 0xDEADBEEF 
        print("!!! Frame byl úmyslně poškozen !!!")


if __name__ == "__main__":
    frame = EthFrame("00:11:22:33:44:55", "AA:BB:CC:DD:EE:FF", 0x0800, "Hello Network")
    print(frame)
    print(f"Je rámec v pořádku? {frame.is_valid()}\n")

    frame.set_payload("Updated Data") # Teď už to projde!
    print(f"Po změně dat: {frame}")
    print(f"Je stále v pořádku? {frame.is_valid()}\n")

    frame.corrupt_data()
    print(frame)
    print(f"Výsledek validace po poškození: {frame.is_valid()}")