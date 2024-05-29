import Image from "next/image";

export default function Topbar() {
    return(
        <div className="w-full p-4">
            <Image
                src={"/buda-logo.svg"}
                alt="Buda logo"
                width={150}
                height={100}
            />
        </div>
    )
}