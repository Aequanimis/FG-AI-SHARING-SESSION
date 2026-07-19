export function ClosingRoles() {
  const roles = [["人", "目标、判断和责任"], ["Chat", "理解、规划和校准"], ["Agent", "调用工具并完成执行"], ["Skill", "沉淀可重复能力"]];
  return <div className="closing-roles">{roles.map(([name, text], index) => <div key={name}><span>0{index + 1}</span><strong>{name}</strong><p>{text}</p></div>)}</div>;
}
