// Responsável por gerenciar a captação de hora, dia e ano da aplicação

export function updateDateTime(setDate, setHour) {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('pt-BR', { ...options, hour: undefined, minute: undefined, second: undefined });

    const timeDate = new Date();
    const time = timeDate.toLocaleTimeString('pt-BR');
    setDate(`${formattedDate}`);
    setHour(time);
}