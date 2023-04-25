import './Header.css'

export default function Header() {
    return(
        <div className="header">
            <ul>
                <li>
                    <a href={"/"}>
                        Как начать?
                    </a>
                </li>
                <li>
                    <a href={"/ldastats"}>
                        Статистика
                    </a>
                </li>
                <li>
                    <a href={"/consumer"}>
                        Обработчик
                    </a>
                </li>                
            </ul>
        </div>);
}