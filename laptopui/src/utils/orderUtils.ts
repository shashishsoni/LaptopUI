export const generateOrderId = (userId?: string): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  const userPrefix = userId ? userId.substring(0, 4) : 'USR';
  
  return `ORD-${userPrefix}-${timestamp}-${randomStr}`;
}; 